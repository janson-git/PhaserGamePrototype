import {SceneBase} from "./SceneBase";

export class Preloader extends SceneBase {
    // -------------------------------------------------------------------------
    public create(): void {
        console.log("Preloader");

        this.scene.start("Hello");
    }
}
