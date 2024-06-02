import Layout from "./layout_full"

export const metadata = {
    title: 'HealAssist',
    description: 'Help achieve high quality lifestyle',
    icons: {
      icon: '/icon.png',
    },
  };

export default function RootLayout({ children }) {
    return <Layout>{children}</Layout>;
}