import { useEffect, useState, type ReactNode } from "react";
import { Accessibility as AccessibilityIcon, Minus, Plus } from "lucide-react";
import Drawer from "../Drawer/Drawer";
import Button from "../Button/Button";
import ColorFilters from "./ColorFilters";
import ReadingRuler from "./ReadingRuler";
import {
  applySettings,
  FONT_STEPS,
  useA11ySettings,
  type ColorMode,
  type Spacing,
} from "./accessibilityStore";
import styles from "./Accessibility.module.scss";

const spacingOptions: { value: Spacing; label: string }[] = [
  { value: "normal", label: "Padrão" },
  { value: "medium", label: "Médio" },
  { value: "large", label: "Grande" },
];

const colorOptions: { value: ColorMode; label: string; hint?: string }[] = [
  { value: "none", label: "Nenhum" },
  {
    value: "protanopia",
    label: "Protanopia",
    hint: "dificuldade com vermelho",
  },
  {
    value: "deuteranopia",
    label: "Deuteranopia",
    hint: "dificuldade com verde",
  },
  { value: "tritanopia", label: "Tritanopia", hint: "dificuldade com azul" },
  { value: "grayscale", label: "Escala de cinza" },
];

function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.choices}>
        {options.map((option) => (
          <label key={option.value} className={styles.choice}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={styles.visuallyHidden}
            />
            <span>
              {option.label}
              {option.hint && <small>{option.hint}</small>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Switch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.switch}>
      <span className={styles.switchText}>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={styles.switchInput}
      />
    </label>
  );
}

export default function Accessibility() {
  const [open, setOpen] = useState(false);
  const { settings, update, reset, isDefault } = useA11ySettings();

  useEffect(() => applySettings(settings), [settings]);

  const stepIndex = FONT_STEPS.indexOf(settings.fontScale);

  return (
    <>
      <ColorFilters />
      {settings.ruler && <ReadingRuler />}

      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label="Abrir opções de acessibilidade"
      >
        <AccessibilityIcon size={28} aria-hidden="true" />
      </button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Acessibilidade"
        side="right"
        footer={
          <Button
            as="button"
            variant="outline"
            onClick={reset}
            disabled={isDefault}
          >
            Restaurar padrões
          </Button>
        }
      >
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Tamanho do texto</legend>
          <div className={styles.fontControl}>
            <Button
              as="button"
              variant="outline"
              size="sm"
              aria-label="Diminuir texto"
              disabled={stepIndex <= 0}
              onClick={() => update({ fontScale: FONT_STEPS[stepIndex - 1] })}
            >
              <Minus size={18} aria-hidden="true" />
            </Button>
            <output className={styles.fontValue} aria-live="polite">
              {settings.fontScale}%
            </output>
            <Button
              as="button"
              variant="outline"
              size="sm"
              aria-label="Aumentar texto"
              disabled={stepIndex >= FONT_STEPS.length - 1}
              onClick={() => update({ fontScale: FONT_STEPS[stepIndex + 1] })}
            >
              <Plus size={18} aria-hidden="true" />
            </Button>
          </div>
        </fieldset>

        <ChoiceGroup
          legend="Espaçamento do texto"
          name="a11y-spacing"
          value={settings.spacing}
          options={spacingOptions}
          onChange={(spacing) => update({ spacing })}
        />

        <ChoiceGroup
          legend="Daltonismo"
          name="a11y-color"
          value={settings.colorMode}
          options={colorOptions}
          onChange={(colorMode) => update({ colorMode })}
        />

        <div className={styles.switches}>
          <Switch
            label="Alto contraste"
            description="Realça o contraste e sublinha os links"
            checked={settings.highContrast}
            onChange={(highContrast) => update({ highContrast })}
          />
          <Switch
            label="Pausar animações"
            description="Remove movimentos e transições"
            checked={settings.reduceMotion}
            onChange={(reduceMotion) => update({ reduceMotion })}
          />
          <Switch
            label="Régua de leitura"
            description="Destaca a linha sob o mouse ou o foco do teclado"
            checked={settings.ruler}
            onChange={(ruler) => update({ ruler })}
          />
        </div>
      </Drawer>
    </>
  );
}
