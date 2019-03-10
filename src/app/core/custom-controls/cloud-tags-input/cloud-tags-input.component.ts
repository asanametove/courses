import { Component, OnInit, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { Identifiable } from '@shared/common.interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'courses-cloud-tags-input',
  templateUrl: './cloud-tags-input.component.html',
  styleUrls: ['./cloud-tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CloudTagsInputComponent),
      multi: true,
    },
  ],
})
export class CloudTagsInputComponent implements OnInit, ControlValueAccessor {

  @Input() public selectedItems: any[];
  @Input() public itemsToSelect: any[];
  public onChange: (value: any[]) => void;
  public onTouched: () => void;
  public model = '';
  private _selectedItems: any[];
  private _itemsToSelect: any[];
  private debounceTime = 100;
  private minCharsCount = 2;
  private suggestionsCount = 10;

  constructor(
    private cdRef: ChangeDetectorRef,
  ) { }

  public writeValue(value: any): void {
    this._selectedItems = [...value];
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnInit() {
    this._itemsToSelect = [...this.itemsToSelect];
  }

  public onSelect({ item }: any): void {
    this.onTouched();
    this._selectedItems = [...this._selectedItems, item];
    this.onChange(this._selectedItems);
    this.model = '';
    this.cdRef.detectChanges();
    this._itemsToSelect = this._itemsToSelect.filter(this.byNotId(item.id));
  }

  public onRemove(id: string): void {
    this.onTouched();
    const itemToRemove = this._selectedItems.find(this.byId(id));
    this._itemsToSelect.push(itemToRemove);
    this._selectedItems = this._selectedItems.filter(this.byNotId(id));
    this.onChange(this._selectedItems);
  }

  public search = (text$: Observable<string>) => text$.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged(),
    map(term => term.length < this.minCharsCount
      ? []
      : this._itemsToSelect
          .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, this.suggestionsCount),
    ),
  )

  public formatter = (result: any) => result.name;

  private byId = (id: string) => (item: Identifiable) => item.id === id;

  private byNotId = (id: string) => (item: Identifiable) => item.id !== id;

}
