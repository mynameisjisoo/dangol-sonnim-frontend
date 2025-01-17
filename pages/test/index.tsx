import { useState } from "react";
import styled from "@emotion/styled";

import { Texts, Colors } from "styles/common";
import Banner from "customer/banner";
import BottomSheet from "common/bottomSheet";
import Layout from "common/layout";
import SearchBar from "customer/main/searchBar";
import Spinner from "common/spinner";
import useToastStore from "src/store/toast";
import devOnly from "src/utils/devOnly";

const Test = () => {
  const TestDiv = styled.div`
    ${Texts.B2_14_R_line}
    color: ${Colors.amber50};
  `;

  const { setMessage } = useToastStore();

  const [open, setOpen] = useState(false);

  return (
    <Layout title="테스트 페이지">
      <br />
      <SearchBar />
      <br />
      <TestDiv onClick={() => setOpen(true)}>안녕하세요</TestDiv>
      <Banner
        images={[
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
          { src: "https://aware.brownbag.one/images/aware/aware-logo.png", alt: "어웨어" },
        ]}
      />
      <BottomSheet
        open={open}
        setOpen={setOpen}
        title="테스트"
        isBackButton={false}
        isXButton={true}
        height="300px"
        component={<div>바텀시트 테스트</div>}
      />
      <br />
      <Spinner />
      <br />
      <button onClick={() => setMessage("방문이 등록되었습니다.", false, "info")}>
        toast info
      </button>
      <br />
      <button
        onClick={() =>
          setMessage("QR코드 인증에 실패했습니다.\n다시 한번 확인해주세요.", true, "warning")
        }
      >
        toast warning
      </button>
    </Layout>
  );
};

export default Test;
export const getServerSideProps = devOnly;
