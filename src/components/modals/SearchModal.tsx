"use client";

import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import * as React from "react";
import { Range } from "react-date-range";

import useSearchModal from "@/hooks/useSearchModal";

import Heading from "@/components/Heading";
import Calendar from "@/components/inputs/Calendar";
import Counter from "@/components/inputs/Counter";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/CountrySelect";

import Modal from "./Modal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = React.useState(STEPS.LOCATION);
  const [location, setLocation] = React.useState<CountrySelectValue | null>(
    null
  );
  const [guestCount, setGuestCount] = React.useState(1);
  const [roomCount, setRoomCount] = React.useState(1);
  const [bathroomCount, setBathroomCount] = React.useState(1);
  const [dateRange, setDateRange] = React.useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const OnBack = () => {
    setStep((prev) => prev - 1);
  };

  const OnNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit = React.useCallback(async () => {
    if (step !== STEPS.INFO) {
      return OnNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);
  const actionLabel = React.useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you want to go?" subTitle="Pick a location!" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you want to go?"
          subTitle="Pick a date range!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subTitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : OnBack}
      body={bodyContent}
      disabled={false}
    />
  );
}
