"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/hooks/useRentModal";

import Heading from "@/components/Heading";
import CategoryInput from "@/components/inputs/CategoryInput";
import CountrySelect, {
  CountrySelectValue,
} from "@/components/inputs/CountrySelect";
import { categories } from "@/components/Layout/Header/Categories";

import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  Price = 5,
}

export default function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = React.useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      questCount: 1,
      bathroomCount: 1,
      image: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (
    id: string,
    value:
      | string
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | CountrySelectValue
      | null
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const OnBack = () => {
    setStep((prev) => prev - 1);
  };

  const OnNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.Price) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subTitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where's your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = <div className="flex flex-col gap-8">Info step!</div>;
  }

  if (step === STEPS.IMAGES) {
    bodyContent = <div className="flex flex-col gap-8">Images step!</div>;
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = <div className="flex flex-col gap-8">Description step!</div>;
  }

  if (step === STEPS.Price) {
    bodyContent = <div className="flex flex-col gap-8">Price step!</div>;
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={OnNext}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : OnBack}
      body={bodyContent}
      disabled={false}
    />
  );
}
