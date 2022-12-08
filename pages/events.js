import Head from "next/head";

import Event from "../components/Event";
import Alert from "../components/Alert";
import Page from "../components/Page";

export async function getServerSideProps(context) {
  let events = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
    events = await res.json();
  } catch (e) {
    console.log("ERROR search users", e);
  }

  return {
    props: { events },
  };
}

export default function Events({ events }) {
  return (
    <>
      <Head>
        <title>Events the community members are going to</title>
        <meta name="description" content="Search LinkFree user directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <h1 className="text-4xl mb-4 font-bold">Community events</h1>
        {!events.length && <Alert type="info" message="No events found" />}
        <ul role="list" className="divide-y divide-gray-200">
          {events.map((event, index) => (
            <Event event={event} username={event.author} key={index} />
          ))}
        </ul>
      </Page>
    </>
  );
}
