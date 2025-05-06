
import Head from 'next/head';
import Loading from '../components/loading';

export default function Home() {
  return (
    <>
      <Head>
        <title>Redirigiendo...</title>
        <meta http-equiv="refresh" content="0;url=/1" />
      </Head>
      <div className="flex items-center justify-center h-screen">
        <Loading/>
      </div>
    </>
  );
}