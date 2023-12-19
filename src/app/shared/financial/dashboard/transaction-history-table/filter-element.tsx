'use client';

import StatusField from '@/components/controlled-table/status-field';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { transactionTypes } from '@/data/transaction-history';
import { PiTrashDuotone } from 'react-icons/pi';

const transactionTypesOptions = Object.entries(transactionTypes).map(
  ([value, name]) => ({ name, value })
);

const statusOptions = [
  {
    value: 'complete',
    name: 'Complete',
    label: (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">Complete</Text>
      </div>
    ),
  },
  {
    value: 'pending',
    name: 'Pending',
    label: (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">Pending</Text>
      </div>
    ),
  },
  {
    value: 'canceled',
    name: 'Canceled',
    label: (
      <div className="flex items-center">
        <Badge color="danger" renderAsDot />
        <Text className="ms-2 font-medium text-red-dark">Canceled</Text>
      </div>
    ),
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};
export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 @[22rem]:flex-row @[35rem]:w-auto @[57rem]:-ms-4">
      <StatusField
        className="w-full min-w-[170px] @[35rem]:w-auto"
        placeholder="Select type"
        options={transactionTypesOptions}
        value={filters['type']}
        onChange={(value: string) => {
          updateFilter('type', value);
        }}
        getOptionValue={(option) => option.name}
        displayValue={(selected: string) =>
          transactionTypesOptions.find((option) => option.value === selected)
            ?.name ?? ''
        }
        placement="bottom-start"
      />
      <StatusField
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected: string) =>
          statusOptions.find((option) => option.value === selected)?.label ??
          selected
        }
      />
      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </div>
  );
}
