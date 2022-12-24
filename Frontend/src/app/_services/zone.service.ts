import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Zone } from '../Interfaces/Zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getZones() {
    return this.http.get<Zone[]>(this.baseUrl + 'Zones');
  }

  getZoneById(zoneId: number) {
    this.http.get<Zone>(this.baseUrl + 'Zones/' + zoneId);
  }

  addZone(zone: Zone) {
    return this.http.post(this.baseUrl + 'Zones', zone);
  }

  updateZone(zone: Zone) {
    return this.http.put(this.baseUrl + 'Zones', zone);
  }

  deleteZone(zoneId: number) {
    return this.http.delete<boolean>(this.baseUrl + 'Zones/' + zoneId);
  }
}
