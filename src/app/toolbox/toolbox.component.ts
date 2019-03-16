import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'courses-toolbox',
  templateUrl: './toolbox.component.html',
})
export class ToolboxComponent implements OnInit {
  @Output() public search = new EventEmitter<string>();

  public searchForm = new FormGroup({
    query: new FormControl(''),
  });

  public ngOnInit() {
    this.searchForm.valueChanges.subscribe(({ query }) => {
      this.search.emit(query.toLowerCase());
    });
  }
}
