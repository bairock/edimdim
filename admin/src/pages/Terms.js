import styled from 'styled-components'

const Container = styled.div`
    max-width: 700px;
    padding: 30px 0;
    margin: 0 auto;

    .title {
        font-size: 21px;
        font-weight: bold;
    }

    .subtitle {
        font-size: 16px;
        font-weight: 600;
    }

    .text {
        font-size: 14px;
        text-align: justify;
    }

    @media only screen and (max-width: 770px) {
        padding: 30px;
    }
`

const Terms = () => {
    return (
        <Container>
            <p className='title'>
                Пользовательское соглашение
                https://edimdim.ru
            </p>
            <p className='text'>
                Настоящее Пользовательское соглашение (далее – «Соглашение») заключается между ИП Богдашин Николай Михайлович и любым лицом, намеревающимся использовать и/или использующим приложение «EDIM» для мобильных устройств под управлением iOS и Android
            </p>
            <p className='subtitle'>
                1. Термины и определения
            </p>
            <p className='text'>
                1.1 Администрация – ИП Богдашин Николай Михайлович, (ОГРН 316144700076140), адрес 677000, г. Якутск, 202-й микрорайон, 19, квартира 65.
            </p>
            <p className='text'>
                1.2 Сервис – приложение «EDIM» для мобильных устройств под управлением iOS и Android. Правообладателем Сервиса в целом является Администрация, правообладателями отдельных компонентов Сервиса могут являться третьи лица, предоставившие Администрации право использовать соответствующие компоненты в составе Сервиса.
            </p>
            <p className='text'>
                1.3 Пользователь – лицо, намеренное использовать или использующее Сервис.
            </p>
            <p className='text'>
                1.4 Услуги – производство, реализация и организация потребления кулинарной продукции, которые могут быть оказаны Пользователям Партнерами и иными организациями, сведения о которых размещены в Сервисе, в том числе, с использованием Сервиса. Администрация не оказывает Услуг, а исключительно предоставляет Пользователям информацию о Услугах с использованием Сервиса.
            </p>
            <p className='text'>
                1.6 Партнер – организация или индивидуальный предприниматель, сведения о которых размещены в Сервисе. Услуги, предлагаемые Партнерами для приобретения с использованием Сервиса, подлежат оказанию исключительно Партнерами, предоставляющими организацию общественного питания.
            </p>
            <p className='subtitle'>
                2. Общие положения
            </p>
            <p className='text'>
                2.1 Текст настоящего Соглашения является публичной офертой (предложением) Администрации, адресованной неопределенному кругу лиц и содержащей предложение Администрации о заключении с каждым Пользователем соглашения, регулирующего порядок взаимодействия Администрации и Пользователя при использовании Сервиса на условиях, указанных в данном документе.
            </p>
            <p className='text'>
                2.2 Акцептом настоящей оферты согласно пункту 3 статьи 438 и пункту 3 статьи 1286 Гражданского кодекса Российской Федерации являются любые действия Пользователя по использованию Сервиса, в том числе первое открытие любой страницы Сервиса в браузере на любом устройстве Пользователя.
            </p>
            <p className='text'>
                2.3 Пользователь дает свое согласие на обработку Администрацией персональных данных на условиях Политики конфиденциальности путем нажатия кнопки «Согласен».
            </p>
            <p className='text'>
                2.4 Использование Сервиса и любых его компонентов, в том числе его просмотр, поиск информации, использование любых сервисов (далее – использование Сервиса) возможно только при условии полного и безоговорочного принятия условий настоящей оферты (акцепта) в форме, установленной настоящим Соглашением.
            </p>
            <p className='text'>
                2.5 При несогласии с условиями настоящего Соглашения Пользователь обязан немедленно прекратить использование Сервиса.
            </p>
            <p className='subtitle'>
                3. Предмет соглашения
            </p>
            <p className='text'>
                3.1 По настоящему Соглашению Администрация безвозмездно предоставляет Пользователю неисключительную лицензию на использование Сервиса. Сервис представляет собой составной (сложный) объект интеллектуальной собственности в составе программ для ЭВМ и других программных средств, баз данных, графического контента и других произведений, объединенных для обеспечения нормального функционирования Сервиса и использования его возможностей.
            </p>
            <p className='text'>
                3.2 Использование Сервиса Пользователями осуществляется в личных целях, не связанных с извлечением прибыли, для осуществления поиска организаций предоставляющих услуги по общественному питанию.
            </p>
            <p className='text'>
                3.3 При необходимости использования функционала Сервиса в коммерческих целях (то есть для размещения информации об Услугах и Партнерах, для обеспечения получения заявок Пользователей на оказание Услуг) Пользователь обязан заключить с Администрацией лицензионный договор в письменной форме.
            </p>
            <p className='text'>
                3.4 Функционал Сервиса, предназначенный для осуществления поиска организаций, предоставляющих услуги по общественному питанию и установлению в дальнейшем связи с организациями при получении Услуг предоставляется бесплатно. Услуги, оказываемые Партнерами, сведения о которых размещены в Сервисе, подлежат оплате Пользователем соответствующим Партнерам.
            </p>
            <p className='subtitle'>
                4. Сведения, размещаемые в Сервисе
            </p>
            <p className='text'>
                4.1 Сервис предназначен для поиска организаций предоставляющих услуги по общественному питанию, а также в совокупности осуществление операций (действий) для непосредственного контакта в процессе реализации и/или организации потребления продукции общественного питания и/или организации досуга.
            </p>
            <p className='text'>
                4.2 Администрация принимает все разумные меры для проверки информации, предоставляемой Партнерами и Специалистами для размещения в Сервисе, в том числе о наличии лицензий и разрешений.
            </p>
            <p className='text'>
                4.3 Вместе с тем, Администрация не осуществляет регулярную проверку указанных сведений на предмет актуальности. В связи с этим Пользователь обязуется при обращении к определенному Партнеру самостоятельно убедиться в наличии существующих стандартов и требований к методам и формам обслуживания организаций предоставляющих услуги по общественному питанию.
            </p>
            <p className='text'>
                4.4 Администрация принимает все разумные меры для предотвращения размещения или удаления комментариев Пользователей с заведомо недостоверной либо не соответствующей законодательству информацией, однако не гарантирует достоверность информации, содержащейся в комментариях Пользователей. Администрация удаляет комментарии по требованию Партнеров, либо Пользователей только в случае предоставления доказательств их явной недостоверности либо противоречия законодательству. Администрация удаляет комментарии по требованиям компетентных государственных органов, предъявленных в порядке, установленном законом. Администрация вправе в любое время удалить любые комментарии и любую иную информацию с Сервиса по собственной инициативе.
            </p>
            <p className='subtitle'>
                5. Лицензия
            </p>
            <p className='text'>
                5.1 Администрации обладает исключительными правами на Сервис либо лицензиями на использование отдельных компонентов Сервиса, в том числе на результаты интеллектуальной деятельности, включая программный код, размещенные в Сервисе базы данных (сведения о Партнерах и Специалистах), произведения дизайна, тексты, а также средства индивидуализации (фирменное наименование, товарные знаки, знаки обслуживания, коммерческие обозначения), кроме объектов интеллектуальной собственности, которые были получены Администрацией из источников в сети Интернет, публикующих информацию в свободном доступе. Использование Сервиса не предусматривает передачу прав на Сервис или любые его компоненты. Пользователю предоставляется ограниченное право на использование Сервиса в соответствии с условиями Соглашения. Такое право может быть прекращено в любое время в соответствии с условиями Соглашения и иных соглашений между сторонами.
            </p>
            <p className='text'>
                5.2 Пользователь обязуется не использовать размещенные в Сервисе результаты интеллектуальной деятельности (в том числе, но не ограничиваясь: изображения, тексты, программный код) без предварительного письменного согласия Администрации.
            </p>
            <p className='text'>
                5.3 Все компоненты Сервиса предоставляются для использования на условиях настоящего Соглашения бесплатно и в состоянии «как есть». Администрация не гарантирует доступность Сервиса в любой момент. Администрация имеет право в любой момент отказать любому Пользователю в использовании Сервиса при нарушении Правил.
            </p>
            <p className='text'>
                5.4 Пользователь не вправе требовать внесения каких-либо изменений в Сервис. Администрация не несет ответственности за коммерческую пригодность Сервиса, не гарантирует соответствие Сервиса специальным требованиям Пользователей или возможность настройки разделов Сервиса в соответствии с предпочтениями Пользователя, а также не гарантирует, что программное обеспечение Сервиса полностью свободно от дефектов и ошибок, и должно функционировать бесперебойно и в обязательном порядке.
            </p>
            <p className='text'>
                5.5 Использование Сервиса осуществляется Пользователем исключительно под свою ответственность и на собственный риск. Администрация не гарантирует должного функционирования Сервиса и не несет ответственности за вред, причиненный Пользователю в результате использования Сервиса. Администрация не несет ответственности за риск наступления неблагоприятных последствий, которые наступят или могут наступить вследствие несоответствия используемого Пользователями оборудования, иного программного обеспечения или каналов связи установленным требованиям по защите персональных данных от несанкционированного (противоправного) посягательства третьих лиц.
            </p>
            <p className='text'>
                5.6 Администрация прилагает все разумные усилия, предотвращающие сбои и неполадки в работе Сервиса, однако не гарантирует его бесперебойную работу, не несет ответственности за нее и не обязуется уведомлять Пользователей о перебоях.
            </p>
            <p className='text'>
                5.7 Пользователь не вправе использовать Сервис для рассылки сообщений рекламного характера и иных действий, не связанных непосредственно с использованием Сервиса. Пользователь не вправе использовать программный код Сервиса, какой-либо контент Сервиса (включая, но не ограничиваясь: базы данных, текст, элементы дизайна, графические изображения) без предварительного письменного согласия Администрации (в том числе воспроизводить, копировать, перерабатывать, распространять в любом виде).
            </p>
            <p className='text'>
                5.8 В случае осуществления платежей Пользователь подтверждает, что он ознакомился и принимает условия платежных сервисов, проводящих операции по переводу денежных средств.
            </p>
            <p className='text'>
                5.9 Если Пользователь размещает какую-либо информацию в Сервисе в пределах, допускаемых функционалом Сервиса, Пользователь несет ответственность за достоверность такой информации и соответствие её закону, в том числе отсутствие заведомо ложных, оскорбительных, экстремистских и иных аналогичных материалов. При нарушении указанных обязательств Пользователя Администрация, помимо удаления материалов, оставляет за собой право направить соответствующую информацию в правоохранительные органы.
            </p>
            <p className='text'>
                5.10. При получении Услуг Партнеров с использованием Сервиса Пользователь обязан проявлять корректность и уважительное отношение к Специалистам, не нарушать общепринятых норм морали и этики. Пользователь не вправе обращаться за получением Услуг, находясь в состоянии алкогольного, токсического или наркотического опьянения.
            </p>
            <p className='text'>
                5.11. В случае нарушения правил использования Сервиса, установленных настоящим Соглашением, Администрация вправе расторгнуть настоящее Соглашение в отношении Пользователя, допустившего нарушение, в одностороннем внесудебном порядке и прекратить доступ Пользователя к Сервису, уведомив об этом Пользователя посредством размещения соответствующего уведомления в Личном кабинете Пользователя.
            </p>
            <p className='subtitle'>
                6. Ограничение ответственности
            </p>
            <p className='text'>
                6.1 В связи с тем, что по настоящему Соглашению Пользователю Администрацией не предоставляется никаких платных услуг, на отношения между Администрацией и Пользователей не распространяется законодательство о защите прав потребителей.
            </p>
            <p className='text'>
                6.2 Администрация ни при каких обстоятельствах не несет ответственности за качество Услуг, оказываемых Партнерами, в том числе тех, профили которых размещены в Сервисе.
            </p>
            <p className='subtitle'>
                7. Электронное взаимодействие
            </p>
            <p className='text'>
                7.1 Администрация предоставляет Пользователям возможность использовать раздел Сервиса – Личный кабинет, доступ к которому предоставляется после прохождения процедуры регистрации и присвоения уникального идентификатора (логина) и пароля. В качестве идентификатора может быть использован, в том числе, адрес электронной почты или номер мобильного телефона.
            </p>
            <p className='text'>
                7.2 Сочетание уникального идентификатора (логина) и пароля от Личного кабинета Пользователя считается простой электронной подписью соответствующего Пользователя. Порядок электронного взаимодействия Пользователей определяется данным Соглашением.
            </p>
            <p className='text'>
                7.3 Для незарегистрированных Пользователей средствами простой электронной подписи признаются уникальный электронный почтовый адрес либо номер мобильного телефона такого Пользователя, указанный им при использовании Сервиса.
            </p>
            <p className='text'>
                7.4 Пользователь соглашается с тем, что любые документы, размещенные в Сервисе и согласованные Пользователем в Личном кабинете, в том числе, путем проставления специальной отметки («галочки») или исполнения условий, определенных такими документами, а также сообщения, направленные Пользователем с использованием Личного кабинета или адресов электронной почты, указанных при регистрации в Сервисе, считаются подписанными простой электронной подписью Пользователя и эквивалентными документам на бумажном носителе, подписанным Пользователем собственноручно. Стороны согласовали, что настоящий пункт применяется, в том числе, к документам, исходящим от третьих лиц, включая договоры с Партнерами, условия которых могут быть доведены до сведения Пользователя в Личном кабинете.
            </p>
            <p className='subtitle'>
                8. Оформление заказа
            </p>
            <p className='text'>
                8.1. Заказ может быть оформлен Пользователем с помощью функционала сервиса edimdim. Оформление заказа и его доставки осуществляется Пользователем на условиях, указанных в приложении edimdim, и является подтверждением согласия Пользователя с существенными условиями продажи товаров. В отношении отдельных категорий заказов стоимость доставки Заказов может быть не установлена, Пользователь информируется об этом при оформлении заказа (снижение/отсутствие стоимости доставки в зависимости от суммы заказа).
            </p>
            <p className='text'>
                8.2. Для оформления заказа на сервисе Пользователь осуществляет действия:
            </p>
            <p className='text'>
                а) по выбору страницы Партнера (на странице Партнера может быть указана минимальная сумма заказа, при соблюдении которой заказ может быть принят Партнером),
            </p>
            <p className='text'>
                б) выбору товаров на указанной странице из представленного каталога товаров,
            </p>
            <p className='text'>
                в) заполнению информации об адресе доставки (включая корректное название населенного пункта, улицы (проспекта, шоссе, пр.), номер дома (включая корпус, строение, владение, прочее), подъезда, квартиры, этаж, код домофона) либо по выбору актуального адреса доставки из доступной выборки, при этом Пользователь обязан проверить корректность указанных ранее данных. Если Пользователь предоставляет неверную/некорректную есть серьезные основания полагать, что предоставленная им информация неверна, неполна или неточна, edimdim имеет право приостановить либо отменить регистрацию пользователя и отказать ему в использовании сервиса, кроме того, edimdim вправе удержать денежные средства, полученные от Пользователя за заказ, доставку и Сервисный сбор как компенсацию затрат и расходов Партнера edimdim, лица, доставившего заказ и платеж edimdim за предоставление права использование сервиса соответственно.
            </p>
            <p className='text'>
                г) применению Промокода/баллов (если применимо),
            </p>
            <p className='text'>
                д) оплате заказа (если выбрана онлайн-оплата).
            </p>
            <p className='text'>
                8.3. Информация о количестве, наличии конкретных товаров, их составе (если применимо), ассортименте и стоимости товаров, а также доставке (в случае, если она осуществляется Партнером edimdim) предоставляется Партнером edimdim размещает такие данные на основании предоставленных Партнерами исходных данных и не может нести ответственность за соответствие этих параметров товаров Партнера.
            </p>
            <p className='text'>
                8.4. Пользователь соглашается с тем, что при оформлении Заказа товаров из Партнеров-магазинов фактическая стоимость заказа может отличаться от стоимости заказа, ретранслированной магазинами на сервис edimdim в связи с корректировками весовых товаров, а также возможным фактическим отсутствием товаров в магазине и связанной с ним заменой товаров, при этом при оформлении заказа на банковской карте Пользователя может быть заблокирована или дополнительно списана сумма, превышающая стоимость заказа на сумму не более 10% от стоимости заказа. В случае, если фактическая стоимость заказа ниже заблокированной суммы, излишние денежные средства подлежат возврату. Окончательный расчет по Заказу происходит в момент доставки заказа.
            </p>
            <p className='text'>
                8.5. Фотографии товаров, размещенные на сервисе, носят справочный характер, реальные товары могут не соответствовать таким фотографиям.
            </p>
            <p className='text'>
                8.6. Поле «Комментарии» может содержать только комментарии, уточняющие, но не изменяющие, адрес и порядок доставки. Самостоятельное указание времени доставки/приема заказа, изменение рецептуры блюд, альтернативный номер телефона и иные пожелания в таком поле не допускается и может являться основанием для отмены возврата денежных средств за заказ, включая стоимость доставки и Сервисный сбор.
            </p>
            <p className='text'>
                8.7. Сформированный заказ подлежит подтверждению либо отмене со стороны Партнера edimdim в зависимости от его нагрузки в момент оформления заказа.
            </p>
            <p className='text'>
                8.8. edimdim вправе отменить заказ в случае отсутствия в зоне доставке заказа лица, осуществляющего доставку.
            </p>
            <p className='text'>
                8.9. Уведомления о сроках доставки, предоставляемые Пользователю, носят информационный характер и могут не учитывать обстоятельства, не зависящие от воли edimdim Партнера, лица, осуществляющего доставку, в том числе: задержки в связи с неблагоприятными метеоусловиями, дорожными заторами и пр. Также Пользователь подтверждает свое согласие с тем, что в период повышенного спроса (сезонного или вызванного распространением массовых промокодов) сроки подтверждения заказа и его доставки могут быть увеличены.
            </p>
            <p className='text'>
                8.10. Пользователь несет ответственность за полноту, достаточность и корректность данных, введенных при оформлении заказа. Пользователь несет риски последствий некорректного указания сведений, необходимых для выполнения заказа, в том числе, приводящих к невозможности надлежащего выполнения Заказа.
            </p>
            <p className='text'>
                8.11. edimdim оставляет за собой право отказать Пользователю в применении сервиса edimdim без уведомления Пользователя и/или без объяснения причин.
            </p>
            <p className='subtitle'>
                9. Оплата заказа
            </p>
            <p className='text'>
                9.1. Пользователь оплачивает заказ одним из следующих доступных способов в рублях:
            </p>
            <p className='text'>
                9.1.1. непосредственно при получении заказа наличными денежными средствами, банковской картой или иными способами, предоставленными Партнером edimdim (если применимо).
            </p>
            <p className='text'>
                9.1.2. онлайн-оплата (безналичная оплата) в приложении edimdim банковской картой VISA/MasterCard через платежную систему  Акционерного общества сервиса «Тинькофф Банк». Все дополнительные расходы по перечислению денежных средств за заказ несёт Пользователь.
            </p>
            <p className='text'>
                9.1.3. онлайн-оплата (безналичная оплата) в приложении  edimdim банковской картой VISA/MasterCard через платежную систему Акционерного общества сервиса «Тинькофф Банк». Все дополнительные расходы по перечислению денежных средств за заказ несёт Пользователь. Данные платежных карт хранятся на стороне эквайера с соблюдением требований стандартов.
            </p>
            <p className='text'>
                9.1.4. В порядке, предусмотренном пользовательским соглашением соответствующей Партнерской площадки.
            </p>
            <p className='text'>
                9.2. Пользователь имеет возможность привязать банковскую карту к своему Личному кабинету. В дальнейшем сумма любого последующего Заказа Пользователя будет списываться автоматически с прикрепленной к Личному кабинету банковской карты без указания реквизитов, при подтверждении платежа с его стороны путем нажатия кнопки «Оплатить» в корзине Личного кабинета и ввода одноразового пароля, в случае, если банк-эмитент банковской карты клиента предусматривает использование данной защиты.
            </p>
            <p className='text'>
                9.3. Авторизация операций по банковским картам осуществляется банком. Если у банка есть основания полагать, что операция носит мошеннический характер, то банк вправе отказать в осуществлении данной операции. Мошеннические операции с банковскими картами являются уголовным преступлением.
            </p>
            <p className='text'>
                9.4. Во избежание случаев мошенничества при оплате банковскими картами платежи, оплаченные банковской картой, могут проверяться edimdim в рамках имеющихся возможностей. Пользователь, оформивший такой платеж, обязан по запросу, поступившему от edimdim, предоставить копию необходимых документов для подтверждения правомерного использования банковской карты.
            </p>
            <p className='text'>
                9.5. Возврат денежных средств, оплаченных Пользователем через платежную систему на Сайте банковской картой, осуществляется только на ту карту, с которой была произведена оплата, в соответствии с правилами международных платежных систем и действующим законодательством РФ о национальной платежной системе. Сроки возврата денежных средств регулируются банками-эмитентами и не зависят от сервиса edimdim.
            </p>
            <p className='text'>
                9.6. При использовании Пользователем безналичного способа оплаты кассовый чек направляется Пользователю на подтвержденный номер мобильного телефона, указанный Пользователем при регистрации в Приложении, с помощью push-уведомления приложения edimdim, и доступен Пользователю при открытии такого уведомления, при условии, что Пользователь не отключил возможность получения push-уведомлений для приложения edimdim. Кассовый чек также доступен Пользователю после совершения заказа в разделе «Мои заказы» на Сайте и в приложении. В случае, если Пользователь имеет трудности с ознакомлением с кассовым чеком, Пользователь вправе обратиться в контакт-центр.
            </p>
            <p className='subtitle'>
                10. Отмена и возврат
            </p>
            <p className='text'>
                10.1. Пользователь вправе отказаться от ожидания заказа в случае, если к указанному моменту самовывоза заказ не был готов, после 60 минут срока заказа. В этом случае edimdim возвращает денежные средства Пользователю, при этом срок возврата денежных средств зависит от банка-эмитента.
            </p>
            <p className='text'>
                10.2. Важно: В случае, если Пользователь нарушил установленный срок самовывоза заказа, то ресторан вправе по своему усмотрению передать такой заказ Пользователю, но вне зависимости от факта забора заказа стоимость заказа Пользователю не возвращается и перечисляется ресторану с целью компенсации его расходов.
            </p>
            <p className='text'>
                10.3. Важно: Отмена заказа Пользователем возможна только до момента получения подтверждения о принятии заказа либо при обращении в контактный центр edimdim в том случае, если ресторан не начал приготовление заказа. В случае предзаказа заказ нельзя отменить за 30 минут до момента его самовывоза.
            </p>
            <p className='text'>
                10.4. В случае отмены заказа, когда заказ принят рестораном к выполнению, стоимость заказа Пользователю не возвращается и перечисляется ресторану с целью компенсации его расходов.
            </p>
            <p className='text'>
                10.5. Ресторан несет ответственность за качество заказа, его комплектность и своевременность приготовления заказа в полном размере. В случае возникновения любых претензий со стороны Пользователя, в том числе, в части возмещения причиненных убытков, такие претензии должны направляться ресторану (информация о конкретном ресторане размещена на его странице на сервисе edimdim, также такую информацию можно получить путем обращения в контактный центр edimdim).
            </p>
            <p className='text'>
                10.6. Пользователь единолично несет ответственность за соблюдение требований, установленных рестораном и/или собственником помещения, на территории которого находится ресторан, в связи с распространением новой коронавирусной инфекции (в том числе требований, установленных во исполнение нормативных правовых актов органов государственной власти). В случае если Пользователь, ввиду несоблюдения таких требований, не был допущен на территорию ресторана и не получил заказ, стоимость такого заказа Пользователю не возвращается.
            </p>
            <p className='text'>
                11. Заключительные положения
            </p>
            <p className='text'>
                11.1 Настоящее Соглашение действует в течение всего периода использования Сервиса Пользователем.
            </p>
            <p className='text'>
                11.2 Администрация вправе в любое время изменять условия настоящего Соглашения, публикуя новую редакцию в Сервисе. Актуальная версия Соглашения публикуется в Сервисе и становится обязательной для Пользователя с момента опубликования. Пользователь обязуется регулярно просматривать опубликованный в Сервисе текст Соглашения с целью ознакомления с изменениями.
            </p>
            <p className='text'>
                11.3 порядок уведомления держателя карты об изменениях в соглашении будет направляться сообщением
            </p>
            <p className='text'>
                11.4 обработка операций проводится на стороне процессингового центра/банка, сервис edimdim не хранит карточные данные.
            </p>
        </Container>
    )
}

export default Terms