export const welcome = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verify your email address</title>
      <style>
        /* Set the overall width of the email */
        body {
          width: 600px;
          margin: 0 auto;
        }
    
        /* Style the header */
        header {
          background-color: #000;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
    
        /* Style the logo */
        img {
          max-width: 100%;
        }
    
        /* Style the content area */
        main {
          padding: 20px;
        }
    
        /* Style the footer */
        footer {
          background-color: #f0f0f0;
          color: #000;
          padding: 20px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <header>
        <img src="https://res.cloudinary.com/dr5nmuou0/image/upload/v1690045358/randoms/logo_equxxx.png" alt="logo" />
        <h1>Verify your email address</h1>
      </header>
      <main>
        <p>Hi ${data.name}</p>
        <p>We just need to verify your email address before you can access <strong>LinktoAll</strong>.</p>
        <p>This is the verification token</p>
        <p>${data.token}</p>
        <p>Note: This token will expired within after 2 hours.</p>
        <p>Thank you for your patience.</p>
      </main>
      <footer>
        <p>Copyright &copy; ${new Date().getFullYear()} <strong>LinkToAll</strong></p>
      </footer>
    </body>
    </html>
          `;
};
