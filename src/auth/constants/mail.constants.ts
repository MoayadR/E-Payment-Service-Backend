export const host = "http://localhost:3000/auth/verify"

export function generateEmailHTML(verificationLink:string){
    const emailHTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333;
            text-align: center;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin: 20px 0;
        }

        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .verify-button {
            background-color: #4CAF50;
            color: white;
            padding: 15px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Dear User,</p>
        <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below.</p>
        <div class="button-container">
            <a href="${verificationLink}" class="verify-button">Verify Email</a>
        </div>
        <p>If you did not create an account, please ignore this email.</p>
        <div class="footer">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
`
return emailHTML;    
}
