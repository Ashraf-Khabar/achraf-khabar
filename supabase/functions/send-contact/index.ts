import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function called, method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Parsing request body...");
    const { name, email, subject, message }: ContactEmailRequest = await req.json();
    console.log("Request data received:", { name, email, subject });

    // Initialize Supabase client
    const supabaseUrl = "https://ebtufiefalvzuuqoaxhc.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVidHVmaWVmYWx2enV1cW9heGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3NDQxMjIsImV4cCI6MjA2OTMyMDEyMn0.U0VPa2TJzt9fNJAnSMFMmxJB-rnzKoUpa1Z31oM9jug";
    
    console.log("Creating Supabase client...");
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store the contact submission in the database
    console.log("Storing in database...");
    
    // Extract the first IP address from x-forwarded-for header (can contain multiple IPs)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : "unknown";
    console.log("Client IP extracted:", clientIp);
    
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        subject,
        message,
        ip_address: clientIp,
        user_agent: req.headers.get("user-agent") || "unknown"
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store contact submission");
    }
    console.log("Database insert successful");

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("Resend API key present:", !!resendApiKey);
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ 
          error: "Email service not configured. Please contact the administrator.",
          success: false 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email using Resend
    console.log("Sending email via Resend...");
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["khabarachraf@gmail.com"],
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Message envoyé depuis votre portfolio</small></p>
        `,
      }),
    });

    console.log("Email response status:", emailResponse.status);

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ 
        message: "Message envoyé avec succès !",
        success: true 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-contact function:", error);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ 
        error: `Erreur lors de l'envoi du message: ${error.message}`,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);