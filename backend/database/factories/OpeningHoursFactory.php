<?php

namespace Database\Factories;

use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpeningHoursFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition() {

        $date_from_month = rand(1, 12);
        $date_from_day = 0;

        switch ($date_from_month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                $date_from_day = rand(1, 31);
                break;
            case 2:
                $date_from_day = rand(1, 28);
            case 4:
            case 6:
            case 9:
            case 11:
                $date_from_day = rand(1, 30);
                break;
            default:
                $date_from_day = 1;
                break;
        }

        $date_from = Carbon::createFromDate(null, $date_from_month, $date_from_day);
        $date_to = Carbon::instance($date_from);
        $date_to->addMonths(rand(0, 5));
        $date_to->addDays(rand(1, 31));

        return [
            'day_from' => rand(1, 7),
            'day_to' => rand(0, 1) ? rand(1, 7) : null,
            'specific_date_from' => $date_from,
            'specific_date_to' => $date_to,
            'time_from' => Carbon::createFromTime(rand(0, 23), rand(0, 59)),
            'time_to' => Carbon::createFromTime(rand(0, 23), rand(0, 59)),
        ];
    }
}
