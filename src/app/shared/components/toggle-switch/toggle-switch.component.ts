import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  template: `
    <div class="flex items-center gap-2">
      
      @if (leftLabel) {
        <span [class]="!checked ? 'text-gray-900 font-medium' : 'text-gray-500'" class="text-sm">{{ leftLabel }}</span>
      }
      
      <button 
        type="button"
        [class]="[
          checked ? 'bg-blue-500' : 'bg-gray-300',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        ]"
        class="relative inline-flex h-6 w-12 flex-shrink-0  rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
        (click)="toggle()"
        [attr.aria-pressed]="checked"
      >
        <span 
          [class]="checked ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-1"
        ></span>
      </button>
      
      @if (rightLabel) {
        <span [class]="checked ? 'text-gray-900 font-medium' : 'text-gray-500'" class="text-sm">{{ rightLabel }}</span>
      }
    </div>
  `
})
export class ToggleSwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() leftLabel = '';
  @Input() rightLabel = '';
  @Output() toggleChange = new EventEmitter<boolean>();

  toggle(): void {
    if(!this.disabled){
      this.checked = !this.checked;
      this.toggleChange.emit(this.checked);
    }
  }
}