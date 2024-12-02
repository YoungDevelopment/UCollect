<?php

namespace App\Models\Tiger;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class USR extends Authenticatable
{
    use Notifiable;

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
    protected $table = 'CDS.USR';

    /**
     * define the primary key for the table
     *
     * @var string
     */
    protected $primaryKey = 'USR_CODE';

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
     * disable remember token
     *
     * @return null|string
     */
    public function getRememberToken()
    {
        return null;
    }

    /**
     * disable remember token
     *
     * @param string $value
     */
    public function setRememberToken($value)
    {
    }

    /**
     * disable remember token
     *
     * @return null|string
     */
    public function getRememberTokenName()
    {
        return null;
    }

    /**
     * USR belongs too a ugp.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function ugp()
    {
        return $this->belongsTo(UGP::class, 'USR_GROUP', 'UGP_CODE');
    }

    /**
     * Make CollectOne User.
     *
     * @param $collector
     */
    public static function makeCollectOneUser($collector)
    {
        $data = [
            'USR_NAME'                 => substr($collector->full_name, 0, 29),
            'USR_SECURITY'             => "5",
            'USR_PW'                   => $collector->tiger_user_id,
            'USR_OVR_DESK'             => 'N',
            'USR_CAMPAIGN'             => '',
            'USR_REMOTE_CLI'           => 'N',
            'USR_DESK_SECURITY'        => 'I',
            'USR_DSKS'                 => '',
            'USR_AGY_CLI'              => '',
            'USR_DIAL_SUFF'            => '',
            'USR_BUL_LDATE'            => "0",
            'USR_BUL_LTIME'            => "0",
            'USR_GROUP'                => $collector->group,
            'USR_NW_LOGIN'             => 'N',
            'USR_ALLOW_AD_DUN'         => 'Y',
            'USR_DEF_MOT_DESK'         => $collector->desk,
            'USR_COLLECTOR'            => 'Y',
            'USR_SHOW_PROB'            => '',
            'USR_EMAIL_FLAG'           => '',
            'USR_SALESMAN'             => '',
            'USR_DIALER_TYPE'          => '',
            'USR_C1PD_PIN'             => "0",
            'USR_IND_QUEUE'            => '',
            'USR_DSKS_2'               => '',
            'USR_ORACLE_USERNAME'      => '',
            'USR_ORACLE_PW'            => '',
            'USR_OVR_ON_TIES'          => '',
            'USR_RC_EA'                => '',
            'USR_OVR_STATUS'           => 'N',
            'USR_OVR_PTY'              => 'N',
            'USR_OVR_LTRSER'           => 'N',
            'USR_RC_EMAIL_MGR_UID'     => '',
            'USR_SLSMAN'               => 'N',
            'USR_RC_AGY'               => '',
            'USR_RC_CLIENT_FROM'       => '',
            'USR_RC_CLIENT_THRU'       => '',
            'USR_WC_OPTION_ITMS'       => '',
            'USR_WC_MENU_OPTION'       => '',
            'USR_PW_2'                 => $collector->tiger_user_id,
            'USR_EXPIRE'               => 'N',
            'USR_EXPIRE_DATE'          => "0",
            'USR_DISABLED'             => '',
            'USR_RC_DAR'               => '',
            'USR_JAVA_USER'            => '',
            'USR_MAC_ADDR'             => '',
            'USR_BLOCK_WC_SEC'         => '',
            'USR_ENC'                  => 'N',
            'USR_RET_EMAIL'            => 'info@unifinrs.com',
            'USR_CAMPAIGN2'            => '',
            'USR_CAMPAIGN3'            => '',
            'USR_CAMPAIGN4'            => '',
            'USR_AGENCY_SECURITY'      => 'A',
            'USR_AGYS'                 => '',
            'USR_MAX_REV_BUMP'         => "0",
            'USR_VIEW_ONLY_SECURITY'   => '',
            'USR_CAMPAIGN_TIME_FROM_1' => '',
            'USR_CAMPAIGN_TIME_THRU_1' => '',
            'USR_CAMPAIGN_TIME_FROM_2' => '',
            'USR_CAMPAIGN_TIME_THRU_2' => '',
            'USR_CAMPAIGN_TIME_FROM_3' => '',
            'USR_CAMPAIGN_TIME_THRU_3' => '',
            'USR_CAMPAIGN_TIME_FROM_4' => '',
            'USR_CAMPAIGN_TIME_THRU_4' => '',
            'USR_MAX_CREDIT_REPORTS'   => 0,
            'USR_EFT_ENTRY_OVERRIDE'   => '',
            'USR_IND_TB'               => 'N',
            'USR_LOGIN_RESET'          => '',
            'USR_TIE_OPTION'           => '',
            'USR_ALIAS_RET_EMAIL'      => '',
            'USR_MASK_TAX_ID'          => '',
            'USR_MASK_BANK_ACCOUNT_NO' => '',
            'USR_MASK_CLIENT_REF_NO'   => '',
            'USR_BLOCK_WC_AGY'         => '',
            'USR_EMAIL_CONFIRMATION'   => '',
            'USR_WEBPORTAL_ADMIN'      => '',
            'USR_SESSION'              => 0
        ];

        $usr = self::find($collector->tiger_user_id);

        if (! $usr) {
            $data['USR_CODE'] = strtoupper($collector->tiger_user_id);
            self::create($data);
            return;
        }

        $usr->update($data);
    }
}
