import {Head} from "@greenio/head";
import {useRoute} from "@greenio/router";

export default function Env() {
  let {params} = (useRoute() || {});
  let msg = 'default message here' + (params?.envParam || '');
  try {
    msg = process.env.MY_CUSTOM_SECRET || msg
  } catch {}
  return <h1>
    <Head>
      <title>Env page</title>
    </Head>
    {msg}
  </h1>
}
