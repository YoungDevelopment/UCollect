<?php

namespace App\Models\Tiger;

use Illuminate\Database\Eloquent\Model;

class DSK extends Model
{
    /**
     * Don't auto-apply mass assignment protection.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * define collect one db connection
     *
     * @var string
     */
    protected $connection = 'sqlsrv2';

    /**
     * define table for DBR
     *
     * @var string
     */
    protected $table = 'CDS.DSK';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = 'DSK_CODE';

    /**
     * set incrementing of primary key to false
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * Disable timestamps for the given model.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Make CollectOne Desk.
     *
     * @param $collector
     */
    public static function makeCollectOneDesk($collector)
    {
        $data = [
            'DSK_NAME'                => substr($collector->full_name, 0, 29),
            'DSK_GOAL'                => 0,
            'DSK_PHONE'               => 0,
            'DSK_TITLE'               => '',
            'DSK_COM_FROM1'           => 0,
            'DSK_COM_FROM2'           => 0,
            'DSK_COM_FROM3'           => 0,
            'DSK_COM_FROM4'           => 0,
            'DSK_COM_FROM5'           => 0,
            'DSK_COM_FROM6'           => 0,
            'DSK_COM_THRU1'           => 0,
            'DSK_COM_THRU2'           => 0,
            'DSK_COM_THRU3'           => 0,
            'DSK_COM_THRU4'           => 0,
            'DSK_COM_THRU5'           => 0,
            'DSK_COM_THRU6'           => 0,
            'DSK_COM_PER1'            => 0,
            'DSK_COM_PER2'            => 0,
            'DSK_COM_PER3'            => 0,
            'DSK_COM_PER4'            => 0,
            'DSK_COM_PER5'            => 0,
            'DSK_COM_PER6'            => 0,
            'DSK_MTD1'                => 0,
            'DSK_MTD2'                => 0,
            'DSK_MTD3'                => 0,
            'DSK_MTD4'                => 0,
            'DSK_MTD5'                => 0,
            'DSK_MTD6'                => 0,
            'DSK_MTD7'                => 0,
            'DSK_MTD8'                => 0,
            'DSK_YTD1'                => 0,
            'DSK_YTD2'                => 0,
            'DSK_YTD3'                => 0,
            'DSK_YTD4'                => 0,
            'DSK_YTD5'                => 0,
            'DSK_YTD6'                => 0,
            'DSK_YTD7'                => 0,
            'DSK_YTD8'                => 0,
            'DSK_ITD1'                => 0,
            'DSK_ITD2'                => 0,
            'DSK_ITD3'                => 0,
            'DSK_ITD4'                => 0,
            'DSK_ITD5'                => 0,
            'DSK_ITD6'                => 0,
            'DSK_ITD7'                => 0,
            'DSK_ITD8'                => 0,
            'DSK_DRAW'                => 0,
            'DSK_PHONE_EXT'           => '',
            'DSK_CONTEST_POINTS'      => '',
            'DSK_CUR_CONT_PRM'        => 0,
            'DSK_MAX_ACTIVE'          => 0,
            'DSK_CUR_ACTIVE'          => 0,
            'DSK_SHOW_CONTEST'        => '',
            'DSK_CONSOL_TO_MOVE_DSK' => '',
            'DSK_ALIAS'               => '',
            'DSK_DESK_GROUP'          => '',
        ];

        $dsk = self::find($collector->desk);

        if (! $dsk) {
            $data['DSK_CODE'] = $collector->desk;
            self::create($data);

            return;
        }

        $dsk->update($data);
    }
}