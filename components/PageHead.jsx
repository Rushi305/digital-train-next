import Props from './Props';
export default function PageHead({ kicker, title, lead }) {
  return (<header className="ph"><Props /><div><div className="th">{kicker}</div><h1>{title}</h1><p>{lead}</p></div></header>);
}
