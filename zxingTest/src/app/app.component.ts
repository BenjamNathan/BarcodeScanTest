import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;

  scannerEnabled = false;
  information =
    'No information detected yet.';

    formatsEnabled: BarcodeFormat[] = [
      BarcodeFormat.CODE_39
    ];

  constructor() {}

  public scanSuccessHandler($event: any) {
    this.information = ($event);
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
