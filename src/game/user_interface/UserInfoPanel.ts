import {WorldKnowledge} from "../WorldKnowledge";
import {INTERFACE_WIDTH, TOP_GAP} from "./UserInterface";
import {CAMERA_WIDTH_PIXELS} from "../../app";
import {GROUP_INTERFACE} from "../game_state/Play";
import {Employee} from "../human_stuff/Employee";
import {MEDIUM_GAP_BETWEEN_LINES, TEXT_STYLE} from "../TextStyle";
import {MOOD} from "../human_stuff/HumanMoodManager";
import {PieChart} from "./PieChart";
import {Gauge} from "./Gauge";
import {ColoredGauge} from "./ColoredGauge";

const GRAPH_GAP = 2;
const GAUGE_GAP = 100;

export class UserInfoPanel {
    private worldKnowledge: WorldKnowledge;
    private visible: boolean;
    private employeeName: Phaser.Text;
    private moodRelaxationText: Phaser.Text;
    private moodHungerText: Phaser.Text;
    private moodSocialText: Phaser.Text;
    private moodRelaxationGauge: Gauge;
    private moodHungerGauge: Gauge;
    private moodSocialGauge: Gauge;
    private human: Employee;
    private pieChart: PieChart;
    private currentState: Phaser.Text;
    private wage: Phaser.Text;
    private ambiance: Phaser.Text;

    constructor(worldKnowledge: WorldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.pieChart = new PieChart();
        const gaugeWidth = INTERFACE_WIDTH - GAUGE_GAP - GRAPH_GAP;
        this.moodRelaxationGauge = new ColoredGauge(gaugeWidth, MEDIUM_GAP_BETWEEN_LINES - 2);
        this.moodHungerGauge = new ColoredGauge(gaugeWidth, MEDIUM_GAP_BETWEEN_LINES - 2);
        this.moodSocialGauge = new ColoredGauge(gaugeWidth, MEDIUM_GAP_BETWEEN_LINES - 2);
    }

    create(game: Phaser.Game, groups: { [index: string]: Phaser.Group }) {
        const left = CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + GRAPH_GAP;
        this.employeeName = game.add.text(left, TOP_GAP, '', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.currentState = game.add.text(left, TOP_GAP + MEDIUM_GAP_BETWEEN_LINES, '', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.moodRelaxationText = game.add.text(left, TOP_GAP + 3 * MEDIUM_GAP_BETWEEN_LINES, 'Relax', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.moodHungerText = game.add.text(left, TOP_GAP + 4 * MEDIUM_GAP_BETWEEN_LINES, 'Hunger', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.moodSocialText = game.add.text(left, TOP_GAP + 5 * MEDIUM_GAP_BETWEEN_LINES, 'Social', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.wage = game.add.text(left, TOP_GAP + 6 * MEDIUM_GAP_BETWEEN_LINES, '', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.ambiance = game.add.text(left, TOP_GAP + 7 * MEDIUM_GAP_BETWEEN_LINES, '', TEXT_STYLE, groups[GROUP_INTERFACE]);
        this.pieChart.create(game, groups);
        this.moodRelaxationGauge.create(game, groups, new PIXI.Point(CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + GAUGE_GAP, TOP_GAP + 3 *MEDIUM_GAP_BETWEEN_LINES + 2.5));
        this.moodHungerGauge.create(game, groups, new PIXI.Point(CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + GAUGE_GAP, TOP_GAP + 4 * MEDIUM_GAP_BETWEEN_LINES + 2.5));
        this.moodSocialGauge.create(game, groups, new PIXI.Point(CAMERA_WIDTH_PIXELS - INTERFACE_WIDTH + GAUGE_GAP, TOP_GAP + 5 * MEDIUM_GAP_BETWEEN_LINES + 2.5));
    }

    update() {
        if (this.human) {
            this.moodRelaxationGauge.setValue(this.human.getMood(MOOD.RELAXATION));
            this.moodHungerGauge.setValue(this.human.getMood(MOOD.HUNGER));
            this.moodSocialGauge.setValue(this.human.getMood(MOOD.SOCIAL));
            this.wage.setText('Wage: ' + this.human.getRealWage().getStringValue() + '/day');
            this.ambiance.setText('Ambiance: ' + Math.floor(this.worldKnowledge.getAmbiance(this.human.getPosition()) * 100) + '%');
            this.moodRelaxationGauge.update();
            this.moodHungerGauge.update();
            this.moodSocialGauge.update();
            this.pieChart.update();
            this.currentState.setText(this.human.getState().getDescription());
        }
    }

    show() {
        if (!this.visible) {
            this.employeeName.position.x -= INTERFACE_WIDTH;
            this.pieChart.show();
            this.moodRelaxationText.position.x -= INTERFACE_WIDTH;
            this.moodHungerText.position.x -= INTERFACE_WIDTH;
            this.moodSocialText.position.x -= INTERFACE_WIDTH;
            this.currentState.position.x -= INTERFACE_WIDTH;
            this.wage.position.x -= INTERFACE_WIDTH;
            this.ambiance.position.x -= INTERFACE_WIDTH;
            this.moodRelaxationGauge.show();
            this.moodHungerGauge.show();
            this.moodSocialGauge.show();
        }
        this.visible = true;
    }

    hide() {
        if (this.visible) {
            this.employeeName.position.x += INTERFACE_WIDTH;
            this.pieChart.hide();
            this.moodRelaxationText.position.x += INTERFACE_WIDTH;
            this.moodHungerText.position.x += INTERFACE_WIDTH;
            this.moodSocialText.position.x += INTERFACE_WIDTH;
            this.currentState.position.x += INTERFACE_WIDTH;
            this.wage.position.x += INTERFACE_WIDTH;
            this.ambiance.position.x += INTERFACE_WIDTH;
            this.moodRelaxationGauge.hide();
            this.moodHungerGauge.hide();
            this.moodSocialGauge.hide();
        }
        this.visible = false;
    }

    showEmployeeInfoPanelForYohan(human: Employee) {
        this.human = human;
        this.employeeName.setText(human.getName());
        this.pieChart.setHuman(human);
    }
}
