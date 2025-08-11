/*
SUPABASE EDGE FUNCTION - Deploy this to your Supabase project

To deploy:
1. Install Supabase CLI: npm install -g supabase
2. Login: supabase login  
3. Link project: supabase link --project-ref YOUR_PROJECT_REF
4. Deploy: supabase functions deploy send-sms

Place this file at: supabase/functions/send-sms/index.ts
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  to: string;
  message: string;
  messageId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse the request
    const { to, message, messageId }: SMSRequest = await req.json();

    if (!to || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Get Twilio credentials from environment
    const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
    const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
    const TWILIO_FROM_NUMBER = Deno.env.get('TWILIO_FROM_NUMBER');

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
      console.error('Missing Twilio credentials');
      return new Response(
        JSON.stringify({ error: 'SMS service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Create Twilio API request
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const twilioAuth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);

    const twilioBody = new URLSearchParams({
      To: to,
      From: TWILIO_FROM_NUMBER,
      Body: message
    });

    // Send SMS via Twilio
    const twilioResponse = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${twilioAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: twilioBody.toString()
    });

    const twilioData = await twilioResponse.json();

    if (!twilioResponse.ok) {
      console.error('Twilio error:', twilioData);
      throw new Error(twilioData.message || 'Failed to send SMS');
    }

    // Initialize Supabase client for status update
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update message status in database
    if (messageId) {
      await supabase
        .from('sms_messages')
        .update({ 
          status: 'sent',
          error_message: null 
        })
        .eq('id', messageId);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        sid: twilioData.sid,
        status: twilioData.status 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('SMS function error:', error);

    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});