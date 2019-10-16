import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-remover',
  templateUrl: './dialog-remover.component.html',
  styleUrls: ['./dialog-remover.component.scss']
})
export class DialogRemoverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRemoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }

}
