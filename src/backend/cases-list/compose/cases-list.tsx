"use client"
import { CasesFilter, ModalCase } from "@/shared"
import { CasesTitle } from "@/entities/home/cases-title"
import { ButtonArrow } from "@/shared"
import { ButtonPrimary } from "@/shared"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Case } from "../domain/case"
import { Category } from "../domain/category"
import { CaseCard } from "../ui/case-card"
import styles from "./cases-section.module.scss"

const ITEMS_PER_PAGE_MAP = {
  "1": 4,
  "2": 8,
  "3": 4,
}

const DEFAULT_MODAL_DATA: Case = {
  id: 0,
  title: "",
  modalTitle: "",
  description: null,
  url: null,
  tags: [],
  posterPath: "",
  categories: [],
}

export function CasesList({
  cases,
  categories,
  variant = "1",
}: {
  cases: Case[]
  categories: Category[]
  variant?: "1" | "2" | "3"
}) {
  const itemsPerPage = ITEMS_PER_PAGE_MAP[variant]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Case | null>(null)
  const [selectFilter, setSelectedFilter] = useState<string>("all")
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)
  const [filteredCases, setFilteredCases] = useState(cases)

  useEffect(() => {
    if (selectFilter === "all") {
      setFilteredCases(cases)
    } else {
      setFilteredCases(
        cases.filter((item) =>
          item.categories.find((filter) => filter === selectFilter),
        ),
      )
    }
  }, [selectFilter, visibleCount])

  function handleLoadMore() {
    setVisibleCount((prev) => prev + itemsPerPage)
  }

  function openModal(modalData: Case) {
    setModalData(modalData)
    setIsModalOpen(true)
  }

  function closeModal() {
    setModalData(DEFAULT_MODAL_DATA)
    setIsModalOpen(false)
  }

  function handleFilterClick(value: string) {
    setSelectedFilter(value)

    setVisibleCount(itemsPerPage)
  }

  const visibleCases = filteredCases.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCases.length

  const HEADER_MAP = {
    "1": (
      <CasesTitle>
        <div className={styles.header1}>
          <CasesFilter
            select={selectFilter}
            categories={categories}
            callback={handleFilterClick}
          />
          <ButtonPrimary href="/cases" text="Все кейсы" />
        </div>
      </CasesTitle>
    ),
    "2": (
      <div className="container">
        <CasesFilter
          select={selectFilter}
          categories={categories}
          callback={handleFilterClick}
        />
      </div>
    ),
    "3": (
      <div className={clsx(styles.header3, "container")}>
        <h2 className="h2">
          Наши <span className="purple">кейсы</span>
        </h2>
        <ButtonPrimary href="/cases" text="Все кейсы" />
      </div>
    ),
  }

  const header = HEADER_MAP[variant]

  return (
    <section className="section-pt">
      {header}

      <div className={clsx(styles.grid, "container")}>
        {visibleCases.map((caseItem) => (
          <CaseCard
            caseItem={caseItem}
            onClick={() => openModal(caseItem)}
            key={caseItem.id}
          />
        ))}
      </div>

      {hasMore && (
        <ButtonArrow
          className={styles.loadMoreBtn}
          text="Загрузить ещё"
          onClick={handleLoadMore}
        />
      )}

      <ModalCase
        modalData={modalData}
        isOpen={isModalOpen}
        closeModalCallback={closeModal}
      />
    </section>
  )
}
