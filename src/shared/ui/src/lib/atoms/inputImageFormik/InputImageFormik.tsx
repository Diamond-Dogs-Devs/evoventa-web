import cn from 'classnames';
import Image from 'next/image';
import { useField, useFormikContext } from 'formik';
import { ChangeEvent, FC, InputHTMLAttributes, useMemo, useState } from 'react';

interface InputImageFormikProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}

const InputImageFormik: FC<InputImageFormikProps> = ({
  name,
  label,
  className = '',
  ...props
}) => {
  const [field, { error, touched }] = useField(name);

  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  const [focus, setFocus] = useState(false);
  const [dragging, setDragging] = useState(false);

  const preview = useMemo(() => {
    if (!field.value) return null;

    if (typeof field.value === 'string') {
      return field.value;
    }

    if (field.value instanceof File) {
      return URL.createObjectURL(field.value);
    }

    return null;
  }, [field.value]);

  const handleFile = (file?: File) => {
    setFieldTouched(name, true, true);

    if (!file) return;

    setFieldValue(name, file, true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldTouched(name, true, true);

    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setDragging(false);
    setFieldTouched(name, true, true);

    handleFile(e.dataTransfer.files?.[0]);
  };

  const containerClassName = cn(
    'w-full border border-light-gray-400 rounded-3xl p-4 transition-all duration-200 bg-transparent',
    {
      '!border-primary-500 shadow-sm': focus || dragging,
    },
    className
  );

  const labelClassName = cn(
    'ease-in duration-100 ml-4 translate-y-2 w-fit text-sm text-primary-600 font-normal',
    {
      '!-translate-y-1 !bg-transparent': focus || preview,
      '!backdrop-blur-xl px-2': !focus && !preview,
    }
  );

  return (
    <div className={className}>
      <div className="flex flex-col">
        <div>
          <div className={labelClassName}>
            <label>{label}</label>
          </div>

          <div className={containerClassName}>
            <label
              onClick={() => setFieldTouched(name, true, true)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={cn(
                'flex flex-col items-center justify-center gap-4 border-2 border-dashed border-light-gray-400 rounded-2xl p-6 cursor-pointer transition-all duration-200',
                {
                  'border-primary-500 bg-primary-50': focus || dragging,
                }
              )}
            >
              <input
                {...props}
                name={name}
                type="file"
                accept="image/*"
                className="hidden"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={handleChange}
              />

              {preview ? (
                <div className="relative w-full h-56 overflow-hidden rounded-2xl">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-sm text-primary-600 font-medium">
                    Arrastra una imagen o haz click
                  </span>

                  <span className="text-xs text-gray-400">PNG, JPG, WEBP</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {touched && error && (
          <div className="error text-red-500 text-sm mt-1">{error}</div>
        )}
      </div>
    </div>
  );
};

export default InputImageFormik;
