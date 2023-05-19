"use client";

import { usePagination } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type propertiesPaginationProps = {
  total: number;
};

export default function Pagination({ total }: propertiesPaginationProps) {
  const router = useRouter();
  const params = useSearchParams();
  const page = params?.get("page") ? Number(params.get("page")) : 1;

  const pagination = usePagination({
    total: total,
    initialPage: page,
    boundaries: 1,
    siblings: 1,
  });
  console.log(pagination.active === total, pagination.active, total);
  return (
    <>
      <ul className="my-10 flex flex-wrap items-center justify-center gap-3">
        <li>
          <button
            onClick={() => {
              pagination.previous();
              router.push(`/properties?page=${page > 1 ? page - 1 : 1}`);
            }}
            className="block rounded-full bg-primary p-1 text-3xl text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary hover:disabled:opacity-50"
            disabled={pagination.active === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
        </li>
        {pagination.range.map((page, index) => (
          <li key={index}>
            {page !== "dots" ? (
              <button
                onClick={() => {
                  pagination.setPage(page);
                  router.push(`/properties?page=${page}`);
                }}
                className={`${
                  pagination.active === page
                    ? "bg-primary text-white hover:cursor-not-allowed"
                    : ""
                } flex h-10 items-center justify-center rounded-sm border-2 border-primary px-3 py-1 text-base transition hover:border-primary-hover hover:bg-primary-hover hover:text-white`}
                disabled={pagination.active === page}
              >
                {page}
              </button>
            ) : (
              <div className="flex h-10 items-center rounded-sm border-2 border-primary px-2.5 py-1 text-base transition hover:cursor-not-allowed hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:opacity-50">
                <BsThreeDots />
              </div>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              pagination.next();
              router.push(
                `/properties?page=${page < total ? page + 1 : total}`
              );
            }}
            className="block rounded-full bg-primary p-1 text-3xl text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary hover:disabled:opacity-50"
            disabled={pagination.active === total}
          >
            <MdKeyboardArrowRight />
          </button>
        </li>
      </ul>
    </>
  );
}
