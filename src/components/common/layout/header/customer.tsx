import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { css } from "@emotion/react";

import { Colors, Sizes, Texts } from "styles/common";
import Share from "public/icons/etc/share.svg";
import ArrowLeft from "public/icons/direction/arrowLeft.svg";
import useLoginStore from "src/store/userLogin";

type HeaderProps = {
  subTitle?: string;
  goHome?: boolean;
};

const container = css`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  background-color: ${Colors.white};
  z-index: 1;
  width: 100%;
  height: 3.25rem;
`;

const wrapper = (pathname: string) => css`
  border-bottom: ${pathname !== "/" && `1px solid ${Colors.neutral20}`};
  z-index: 1;
  width: 100%;
  max-width: ${Sizes.customer_width};
`;

const innerWrapper = (pathname: string) => css`
  padding: ${pathname === "/" ? "0.5rem" : "0.75rem"} 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttons = css`
  display: flex;
  gap: 0.25rem;
  color: ${Colors.neutral90};
`;

const pointerButton = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const textButton = css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${Texts.B2_14_R_line}
`;

const buttonDot = css`
  ${Texts.B2_14_R1}
`;

const pageTitle = css`
  ${Texts.S1_16_R}
`;

const hiddenItem = css`
  visibility: hidden;
  width: 1.75rem;
  height: 1.75rem;
`;

const CustomerHeader = (props: HeaderProps) => {
  const { pathname, back, push } = useRouter();
  const { isLogin } = useLoginStore();

  const onShare = () => {
    const currentUrl = window.document.URL;
    navigator.clipboard.writeText(currentUrl).then(() => alert("주소가 복사되었습니다!"));
  };

  return (
    <div css={container}>
      <header css={wrapper(pathname)}>
        <div css={innerWrapper(pathname)}>
          {pathname === "/" ? (
            <>
              <Image
                css={pointerButton}
                src="/images/logo/logo.png"
                alt="logo"
                width="27"
                height="36"
              />
              <div css={buttons}>
                {isLogin ? (
                  <button onClick={() => push("/my")}>
                    <Image
                      css={pointerButton}
                      src="/images/profile.png"
                      alt="profile"
                      width="34"
                      height="34"
                    />
                  </button>
                ) : (
                  <>
                    <button css={textButton} onClick={() => push("/owner")}>
                      사장님 페이지
                    </button>
                    <span css={buttonDot}>•</span>
                    <button css={textButton} onClick={() => push("/login")}>
                      로그인/회원가입
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button css={pointerButton} onClick={props.goHome ? () => push("/") : () => back()}>
                <ArrowLeft stroke={Colors.amber50} />
              </button>
              <span css={pageTitle}>{props.subTitle}</span>
              {pathname === "/store/[id]" ? (
                <div css={pointerButton} onClick={onShare}>
                  <Share />
                </div>
              ) : (
                <div css={hiddenItem} />
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default CustomerHeader;
