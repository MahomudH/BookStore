import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Translator } from 'src/app/Interfaces/Translator';
import { TranslatorService } from 'src/app/_services/translator.service';
import { CreateOrEditTranslatorComponent } from './create-or-edit-translator/create-or-edit-translator.component';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
})
export class TranslatorComponent implements OnInit {
  translators: Translator[];

  constructor(
    private translatorService: TranslatorService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllTranslators();
  }

  reloadPage() {
    this.getAllTranslators();
  }

  getAllTranslators() {
    this.translatorService.getTranslators().subscribe((response) => {
      this.translators = response;
    });
  }

  onDelete(translatorId: number) {
    this.translatorService
      .deleteTranslator(translatorId)
      .subscribe((response) => {
        this.reloadPage();
      });
  }

  onCreate() {
    this.matDialog.open(CreateOrEditTranslatorComponent, {
      width: '50%',
      data: {
        updateMood: false,
      },
    });
  }

  onUpdate(index: number) {
    this.matDialog.open(CreateOrEditTranslatorComponent, {
      width: '50%',
      data: {
        updateMood: true,
        name: this.translators[index].name,
        id: this.translators[index].id,
      },
    });
  }
}
