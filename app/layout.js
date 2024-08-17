import './globals.css';

export const metadata = {
  title: 'Sidemen Chatbot',
  description: 'Ask questions about the Sidemen YouTube group',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
