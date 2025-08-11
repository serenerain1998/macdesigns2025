# SMS Functionality Setup Instructions

## 1. Supabase Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `/supabase-setup.sql`

## 2. Twilio Account Setup

1. Sign up for a Twilio account at https://twilio.com
2. Get a Twilio phone number (you can use a trial account)
3. Note down these credentials from your Twilio Console:
   - Account SID
   - Auth Token  
   - Your Twilio Phone Number

## 3. Environment Variables

Add these environment variables to your project:

### For Supabase Edge Functions:
```bash
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here  
TWILIO_FROM_NUMBER=+1234567890  # Your Twilio number
```

### For React App (.env file):
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Deploy Supabase Edge Function

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. Create the edge function directory:
   ```bash
   mkdir -p supabase/functions/send-sms
   ```

5. Copy the edge function code from `/supabase-edge-function.ts` to `supabase/functions/send-sms/index.ts`

6. Deploy the function:
   ```bash
   supabase functions deploy send-sms
   ```

7. Set the environment variables in Supabase:
   ```bash
   supabase secrets set TWILIO_ACCOUNT_SID=your_account_sid
   supabase secrets set TWILIO_AUTH_TOKEN=your_auth_token  
   supabase secrets set TWILIO_FROM_NUMBER=+1234567890
   ```

## 5. Test the Setup

1. Build and run your React app
2. Try sending a test message through the SMS widget
3. Check your phone for the message
4. Monitor the Supabase logs for any errors

## 6. Message Format

Users will be able to send messages with:
- Their name (required)
- Company name (optional)  
- Message (required, max 160 chars)

You'll receive messages formatted like:
```
📱 New Portfolio Contact from MAC DESIGNS:

👤 Name: John Smith
🏢 Company: Tech Corp

💬 Message:
Hi Melissa, I'd like to discuss a UX opportunity...

📅 12/29/2024, 3:45 PM
```

## 7. Security Notes

- Messages are stored in Supabase with RLS enabled
- Only anonymous users can insert messages
- Only authenticated users can read message history
- Twilio credentials are secured in Supabase environment

## 8. Monitoring

- Check Supabase Edge Function logs for SMS delivery status
- View message history in the `sms_messages` table
- Monitor Twilio usage in your Twilio console