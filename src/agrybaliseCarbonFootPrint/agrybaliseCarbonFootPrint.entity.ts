import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IngredientDto } from "./dto/create-carbonFootPrintProduct.dto";

@Entity("agrybalise_carbon_foot_print")
export class AgrybaliseCarbonFootPrint extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        type: "float",
        nullable: true,
    })
    carbonFootPrint: number | null;

    @Column({
        type: 'json',
        nullable: false,
    })
    recipe: IngredientDto[];

    sanitize() {
        if (this.recipe === null) {
            throw new Error("We need to have a recipe to compute the Agrybalise Carbon Foot Print.");
        }

        if (this.name === null) {
            throw new Error("We need a name to our recipe.")
        }
    }

    constructor(props: {
        name: string;
        recipe: IngredientDto[];
    }) {
        super();

        this.name = props?.name;
        this.recipe = props?.recipe;
        this.sanitize();
    }
}
