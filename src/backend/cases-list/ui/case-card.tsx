import { Tag } from "@/shared"
import Image from "next/image"
import { Case } from "../domain/case"
import styles from "./case.module.scss"

export function CaseCard({
  caseItem,
  onClick,
}: {
  caseItem: Case
  onClick: () => void
}) {
  return (
    <div className={styles.blok} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={caseItem.posterPath}
          alt=""
          width={876}
          height={400}
        />
      </div>
      <div className={styles.tagsWrapper}>
        {caseItem.tags.map((tag, i) => (
          <Tag key={i}>{tag}</Tag>
        ))}
      </div>
      <h3 className="h3">{caseItem.title}</h3>
    </div>
  )
}
