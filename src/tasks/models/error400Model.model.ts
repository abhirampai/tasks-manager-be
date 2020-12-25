import { ApiProperty } from "@nestjs/swagger";

export class error400Model {
    @ApiProperty({type:Number,example:'400'})
    status:number

    @ApiProperty({type:String,example:'Enter A correct Id'})
    message:string
}