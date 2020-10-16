import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { Appointment } from './models/appointment.model';
import { OperationResponse } from './models/response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  scannerEnabled = false;
  transports: Transport[] = [];
  information =
    'No se ha detectado información de ningún código. Acerque un código QR para escanear.';

  code: Appointment;

  constructor(private logService: LogService, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = 'Espera recuperando información... ';

    const appointment = new Appointment($event);
    this.code = new Appointment($event);
    // this.logService.logAppointment(appointment).subscribe(
    //   (result: OperationResponse) => {
    //     this.information = $event;
    //     this.transports = result.object;
    //     this.cd.markForCheck();
    //   },
    //   (error: any) => {
    //     this.information =
    //       'Ha ocurrido un error por favor intentalo nuevamente ... ';
    //     this.cd.markForCheck();
    //   }
    // );
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information =
      'No se ha detectado información de ningún código. Acerque un código QR para escanear.';
  }
}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}
