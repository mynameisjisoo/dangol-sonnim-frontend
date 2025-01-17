import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import axios from "axios";
import { css } from "@emotion/react";
import { useStore } from "zustand";

import TextInput from "common/input/text";
import OwnerLayout from "common/layout/owner";
import FullPageSpinner from "common/spinner/fullPage";
import { Colors, selectStyle, Texts } from "styles/common";
import useMyStoreInfo from "src/store/storeInfo";

type dateType = { year: string; month: string; day: string };

const wrapper = css`
  padding: 0 1.25rem;
`;

const infoText = css`
  padding-top: 4rem;
  text-align: center;
  color: ${Colors.neutral80};
  ${Texts.S1_16_M};
`;

const formWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0;
`;

const labelStyle = css`
  ${Texts.S1_16_M}
  margin-bottom: 0.25rem;
`;

const dateStyle = css`
  display: flex;
  gap: 1rem;
`;

const submitButtom = css`
  ${Texts.S3_18_M}
  background-color: ${Colors.amber50};
  color: ${Colors.white};
  width: 100%;
  padding: 0.938rem;
  border-radius: 0.25rem;
`;

const Business = () => {
  const { push, query, back } = useRouter();
  const { setGlobalStoreInfo } = useStore(useMyStoreInfo);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const START_YEAR = 1900;

  const [businessNumber, setBusinessNumber] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState({
    year: currentYear.toString(),
    month: currentMonth.toString(),
    day: currentDay.toString(),
  });

  const { data, isLoading, mutate, isSuccess } = useMutation(() => {
    return axios
      .post(
        `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.NEXT_PUBLIC_BUSINESS_VALIDATION_KEY}`,
        {
          businesses: [
            {
              b_no: businessNumber,
              start_dt: formatDate(date),
              p_nm: name,
            },
          ],
        },
      )
      .then((res) => res.data.data[0]);
  });

  const yearsArray = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, index) => currentYear - index,
  );
  const monthsArray = Array.from({ length: 12 }, (_, index) => index + 1);
  const daysArray = Array.from({ length: 31 }, (_, index) => index + 1);

  const selectElementsData = [
    {
      name: "year",
      value: date.year,
      dateArray: yearsArray,
    },
    {
      name: "month",
      value: date.month,
      dateArray: monthsArray,
    },
    {
      name: "day",
      value: date.day,
      dateArray: daysArray,
    },
  ];

  const formatDate = (date: dateType) => {
    const formattedDate = Object.values(date)
      .map((value) => value.padStart(2, "0"))
      .join("");
    return formattedDate;
  };

  const onSubmit = () => {
    if (!name || !businessNumber || !date) {
      return alert("모든 칸을 입력해주세요.");
    }
    mutate();
  };

  useEffect(() => {
    if (!isSuccess) return;

    //FIXME: API 연동 테스트 위해 진위 상관없이 모두 확인 처리함
    if (data.valid) {
      setGlobalStoreInfo("registerNumber", businessNumber.toString());
      push(
        {
          pathname: "/owner/auth/complete",
          query: { accessToken: query.accessToken, isEdit: query.isEdit },
        },
        "/owner/auth/complete",
      );
    }

    /** 사업자 등록번호 진위확인 조회 결과 코드 01: Valid, 02: Invalid */

    // if (data.valid === "01" && data.status.b_stt !== "폐업자") {
    //   push(
    //     { pathname: "/owner/auth/complete", query: { isComplete: true } },
    //     "/owner/auth/complete"
    //   );
    // }
    //TODO: 인증 실패 시 모달 띄우기
  }, [isSuccess]);

  useEffect(() => {
    if (!query.accessToken) {
      back();
    }
  }, []);

  if (!query.accessToken) return null;

  return (
    <OwnerLayout title="사업자 등록" subTitle="사업자 등록">
      <section css={wrapper}>
        <h1 css={infoText}>회원님의 사업장 인증을 해주세요.</h1>
        <form css={formWrapper}>
          <div>
            <span css={labelStyle}>사업자등록번호</span>
            <TextInput
              state={businessNumber}
              setState={setBusinessNumber}
              placeholder="‘-’ 입력없이 숫자 10자리"
              type="number"
              minValue={10}
              maxValue={10}
            />
          </div>
          <div>
            <span css={labelStyle}>대표자성명</span>
            <TextInput state={name} setState={setName} type="text" />
          </div>
          <div>
            <span css={labelStyle}>개업일자</span>
            <div css={dateStyle}>
              {selectElementsData.map((el) => (
                <select
                  css={selectStyle}
                  key={el.name}
                  name={el.name}
                  id={el.name}
                  value={el.value}
                  onChange={(e) =>
                    setDate((prev) => {
                      return { ...prev, [el.name]: e.target.value };
                    })
                  }
                >
                  {el.dateArray.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </form>
        <button css={submitButtom} onClick={onSubmit}>
          인증
        </button>
      </section>
      {isLoading && <FullPageSpinner />}
    </OwnerLayout>
  );
};

export default Business;
