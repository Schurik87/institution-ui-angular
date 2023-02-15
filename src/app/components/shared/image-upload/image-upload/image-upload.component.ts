import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule, ButtonModule, FileUploadModule],
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
    constructor() {}

    @Input() imageBase64?: string;
    @Output() imageBase64Output = new EventEmitter<string>();
    @ViewChild('imageSelector') imageSelector: ElementRef;

    async onFileSelect(event: any) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        const fileConentBase64 = await new Promise((resolve, reject) => {
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
        if (typeof fileConentBase64 === 'string') {
            this.imageBase64Output.emit(fileConentBase64);
        }
    }

    cancelSelection() {
        this.imageSelector.nativeElement.value = '';
        this.imageBase64Output.emit('');
    }
}
