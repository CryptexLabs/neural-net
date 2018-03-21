import {interfaces} from "inversify";
import Container = interfaces.Container;

export interface NeuralNetServiceContext {
    getContext(): Container;
}