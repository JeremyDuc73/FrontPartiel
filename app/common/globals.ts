import {Profile} from "@/app/interfaces/Profile";

export class Globals {
    public static baseUrl = "https://partielS2.jeremyduc.com/api/"
    public static token = ""
    public static actualUser: Profile

    public static isLoggedIn(){
        return Globals.token != ""
    }
}