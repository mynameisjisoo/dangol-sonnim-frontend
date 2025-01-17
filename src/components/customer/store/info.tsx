import React from "react";
import { css } from "@emotion/react";
import Image from "next/image";

import { Colors, Texts } from "styles/common";
import Tag from "common/tag/tagCustomer";
import Slider from "common/slider";
import Pick from "public/icons/etc/pick.svg";
import { categoryIdToString } from "src/utils/category";

type InfoProps = {
  infoContent: {
    name: string;
    category: string;
    images: string[];
    description: string;
    menu: string;
    mainSubsDesc: string;
    isLike: boolean;
  };
  onPick: () => void;
};

const sliderWrapper = css`
  margin-bottom: 0.983rem;
`;

const imgStyle = css`
  width: 9.25rem;
  height: 9.25rem;
  flex-shrink: 0;
`;

const titleButtonWrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;
`;

const tittleWrapper = css`
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  h1 {
    ${Texts.H2_21_B}
    margin: 0;
  }

  span {
    ${Texts.B2_14_R1}
    color:${Colors.neutral50}
  }
`;

const descriptionStyle = css`
  ${Texts.B1_13_R2}
  color:${Colors.neutral80};
  margin-bottom: 0.5rem;
`;

const divider = css`
  border: solid ${Colors.neutral10} 1px;
  margin: 0 1rem;
`;

const menuStyle = css`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  p {
    ${Texts.B3_15_M2}
  }
`;

const Info = ({
  infoContent: { name, category, images, mainSubsDesc, description, isLike },
  onPick,
}: InfoProps) => {
  return (
    <section>
      <div css={sliderWrapper}>
        <Slider gap="0.25rem">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={image}
              width={148}
              height={148}
              css={imgStyle}
              priority={true}
            />
          ))}
        </Slider>
      </div>
      <div css={titleButtonWrapper}>
        <div />
        <div css={tittleWrapper}>
          <div css={titleStyle}>
            <h1>{name}</h1>
            <span>{categoryIdToString(category)}</span>
          </div>
          <p css={descriptionStyle}>{description}</p>
        </div>
        <button onClick={onPick}>
          <Pick
            width={24}
            height={24}
            stroke={isLike ? Colors.red40 : Colors.neutral60}
            fill={isLike ? Colors.red40 : "white"}
          />
        </button>
      </div>
      {mainSubsDesc && (
        <>
          <hr css={divider} />
          <div css={menuStyle}>
            <Tag text="대표" bgColor={Colors.green50} bold={true} />
            <p>{mainSubsDesc}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default Info;
