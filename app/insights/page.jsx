import { Head } from '@/components/Bits';
import InsightsClient from '@/components/InsightsClient';
import Pager from '@/components/Pager';
export const metadata = { title: 'Insights | Digital Train' };
export default function Insights() {
  return (<><Head kicker="Insights" title="Ideas worth acting on." lead="SEO guides, paid media strategy, social trends and growth tips." /><section className="sec" style={{ paddingTop: 0 }}><InsightsClient /><p className="demo">Sample articles for layout purposes. Replace with your own writing.</p></section><Pager /></>);
}
