import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface ReminderPickerProps {
  date: Date | undefined;
  time: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

export const ReminderPicker = ({
  date,
  time,
  onDateChange,
  onTimeChange,
}: ReminderPickerProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "w-full sm:w-[240px] justify-start text-left transition-colors duration-200",
              !date && "text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border border-border dark:border-gray-800">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={onDateChange} 
            initialFocus
            className="rounded-md bg-card"
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
        <Input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full sm:w-[120px] transition-colors duration-200"
        />
      </div>
    </div>
  );
};
