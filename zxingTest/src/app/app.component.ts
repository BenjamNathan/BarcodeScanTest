import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { Appointment } from './models/appointment.model';
import { OperationResponse } from './models/response.model';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  scannerEnabled = false;
  transports: Transport[] = [];
  information =
    'No information detected yet.';

    formatsEnabled: BarcodeFormat[] = [
      BarcodeFormat.CODE_39
    ];

  // code: Appointment;

  constructor(private logService: LogService, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  public scanSuccessHandler($event: any) {
    this.information = ($event);

    const appointment = new Appointment($event);
    // this.code = new Appointment($event);
    // this.logService.logAppointment(appointment).subscribe(
    //   (result: OperationResponse) => {
    //     this.information = $event;
    //     this.transports = result.object;
    //     this.cd.markForCheck();
    //   },
    //   (error: any) => {
    //     this.information =
    //       'Error occured try again ... ';
    //     this.cd.markForCheck();
    //   }
    // );
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information =
      'No code information detected';
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
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
