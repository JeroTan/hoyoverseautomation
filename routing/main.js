import { RoutingPlate } from "./plate.js";
import run from "../web/run.js";

export class MainRouting extends RoutingPlate{
    routes(){
        this.GET('/', run.index)
    }
}