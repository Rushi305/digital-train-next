import { Head, CTA } from '@/components/Bits';
import WorkList from '@/components/WorkList';
import Pager from '@/components/Pager';
export const metadata = { title: 'Work | Digital Train' };
export default function Work() {
  return (<><Head kicker="Work" title="Growth, in case studies." lead="Seven demo projects across seven industries. Hover a title to preview, click to open." /><section className="sec" style={{ paddingTop: 0 }}><WorkList /></section><CTA /><Pager /></>);
}
