# ContactWithEmail
A contact form that sends a confirmation email to the user and the input to the developer (you).
Made using Typescript, EJS, Express and Nodemailer.

PREPARATIONS: 

1. Go to https://app.elasticemail.com/api/ and create an account.

2. Go to your registrar / cdn (for me it's Cloudflare) and create the records for your domain.

Create the right records so your mails won't end up in SPAM and so ElasticMail can send out the emails that you want.

Elasticmail wil tell you what records to create so just follow their instructions step by step.

After you're done setting up your records, you'll receive a elastic smtp mail (host), a port, an username and a password.

That's all the prep work there is.
