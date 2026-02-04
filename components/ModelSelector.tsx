import { models } from '@/lib/models';
import { UI_TEXT } from '@/lib/config/ui-text';
import {
  getLabelClass,
  getFormInputClass,
} from '@/lib/styles/shared';

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
  disabled: boolean;
}

export function ModelSelector({
  selectedModel,
  onChange,
  disabled,
}: ModelSelectorProps) {
  const labelClass = getLabelClass();
  const selectClass = getFormInputClass();

  return (
    <div className="mb-6 flex justify-center">
      <div className="w-full max-w-md">
        <label htmlFor="model-select" className={labelClass}>
          {UI_TEXT.LABELS.SELECT_MODEL}
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={selectClass}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
