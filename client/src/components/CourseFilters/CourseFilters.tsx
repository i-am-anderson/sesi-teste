import { useState, type ChangeEvent } from "react";
import { SlidersHorizontal } from "lucide-react";
import Button from "../Button/Button";
import Drawer from "../Drawer/Drawer";
import Select from "../Select/Select";
import {
  EMPTY_FILTERS,
  modalityLabels,
  statusLabels,
} from "../../data/courses";
import type { CourseFiltersOptions } from "../../services/courses";
import styles from "./CourseFilters.module.scss";

export type FilterValues = {
  categoryId: string;
  modality: string;
  status: string;
};

type CourseFiltersProps = {
  /** Opções vindas de GET /api/courses/filters (undefined enquanto carrega). */
  options?: CourseFiltersOptions;
  values: FilterValues;
  onApply: (values: FilterValues) => void;
};

export default function CourseFilters({
  options,
  values,
  onApply,
}: CourseFiltersProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(values);

  const activeCount = Object.values(values).filter(Boolean).length;

  const openDrawer = () => {
    setDraft(values); // sempre abre refletindo os filtros aplicados
    setOpen(true);
  };

  const apply = (next: FilterValues) => {
    onApply(next);
    setOpen(false);
  };

  const change =
    (key: keyof FilterValues) => (event: ChangeEvent<HTMLSelectElement>) =>
      setDraft((current) => ({ ...current, [key]: event.target.value }));

  return (
    <>
      <Button
        as="button"
        variant="outline"
        onClick={openDrawer}
        aria-haspopup="dialog"
      >
        <span className={styles.trigger}>
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filtros
          {activeCount > 0 && (
            <span className={styles.badge}>{activeCount}</span>
          )}
        </span>
      </Button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Filtros"
        footer={
          <>
            <Button
              as="button"
              variant="outline"
              onClick={() => apply(EMPTY_FILTERS)}
            >
              Limpar
            </Button>
            <Button as="button" variant="dark" onClick={() => apply(draft)}>
              Aplicar filtros
            </Button>
          </>
        }
      >
        <Select
          label="Categoria"
          value={draft.categoryId}
          onChange={change("categoryId")}
          disabled={!options}
          options={(options?.categories ?? []).map((c) => ({
            value: String(c.id),
            label: c.name,
          }))}
        />
        <Select
          label="Modalidade"
          value={draft.modality}
          onChange={change("modality")}
          disabled={!options}
          options={(options?.modalities ?? []).map((m) => ({
            value: m,
            label: modalityLabels[m] ?? m,
          }))}
        />
        <Select
          label="Status"
          value={draft.status}
          onChange={change("status")}
          disabled={!options}
          options={(options?.statuses ?? []).map((s) => ({
            value: s,
            label: statusLabels[s] ?? s,
          }))}
        />
      </Drawer>
    </>
  );
}
