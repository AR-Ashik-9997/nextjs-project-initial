import RootLayout from "@/components/Layouts/RootLayout";
import { Typography } from "antd";
const { Title } = Typography;

const index = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",       
      }}
    >
      <Title style={{ color: "darkcyan" }}>
        Wellcome to Nextjs Project Initial
      </Title>
    </div>
  );
};

export default index;

index.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
