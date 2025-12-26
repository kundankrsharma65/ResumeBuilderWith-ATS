import { Helmet } from "react-helmet-async";

export default function Seo({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
