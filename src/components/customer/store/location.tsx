import React from "react";
import { css } from "@emotion/react";

import MapPin from "public/icons/location/mapPin.svg";
import Clock from "public/icons/etc/clock.svg";
import KakaoMap from "common/kakaoMap";
import StoreSection from "customer/store/section";
import { Colors, Texts } from "styles/common";

type LocationProps = {
  address: string;
  detail: string;
  businessHours: { weeks: string; hours: string }[];
};

const addressWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 0.813rem;
`;

const subtitleStyle = css`
  ${Texts.B2_14_M}
  color:${Colors.neutral90};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const exitInfoStyle = css`
  ${Texts.C2_12_R}
  color:#9B9B9B;
  margin-left: 1.25rem;
`;

const mapStyle = css`
  height: 9.75rem;
`;

const openHourWrapper = css`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.125rem;
  margin-bottom: 1.75rem;
`;

const openHourStyle = css`
  ${Texts.B2_14_R1}
  color:${Colors.neutral90};
`;

const Location = ({ address, detail, businessHours }: LocationProps) => {
  return (
    <>
      <StoreSection sectionTitle="위치" fold={true}>
        <div css={addressWrapper}>
          <p css={subtitleStyle}>
            <MapPin />
            {address}
          </p>
          <p css={exitInfoStyle}>{detail}</p>
        </div>
        <div css={mapStyle}>
          <KakaoMap address={address} />
        </div>
        <div css={openHourWrapper}>
          <span css={subtitleStyle}>
            <Clock />
            영업시간
          </span>
          <span css={openHourStyle}>
            {businessHours.map((el) => (
              <div key={el.weeks}>
                <span>{el.weeks}</span>
                &nbsp;
                <span>{el.hours}</span>
              </div>
            ))}
          </span>
        </div>
      </StoreSection>
    </>
  );
};

export default Location;
